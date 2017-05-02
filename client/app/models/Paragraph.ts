"use strict";

import { database } from "firebase";
import { pick } from "underscore";

import { Users, User, Message } from "./";

/*
  in DB structure is next:
  {
    author: string;
    accepted: boolean;
    $userId1: "participant";
    $userId2: "participant";
    lastMessage?: string;
  }
  Example:
  {
    author: "1515";
    accepted: boolean;
    322: "participant";
    1515: "participant";
    lastMessage: "88003553535";
  }
  Fields $userId1 and $userId2 are used to allow to detect if the users is a participant of the dialogue
*/

export class Conversation {

  id: string;
  accepted: boolean;
  author: User;
  participant: User;
  lastMessage?: Message;

  private authorId: string
  private participantId: string
  private lastMessageId?: string

  constructor(data) {
    this.id = data.id || database().ref("/conversations").push().key;
    this.accepted = data.accepted;
    const author = data.author;
    if(typeof author == "string") {
      this.authorId = author;
    } else {
      this.author = new User(data.author);
      this.authorId = this.author.id
    }
    if(data.participant) {
      if(typeof data.participant == "string") {
        this.participantId = data.participant;
      } else {
        this.participant = new User(data.participant);
        this.participantId = this.participant.id;
      }
    } else {
      for(let key in data) {
        if(data[key] == "participant" && key != this.authorId) {
          this.participantId = key;
          break;
        }
      }
    }
    if(data.lastMessage) {
      if(typeof data.lastMessage == "string") {
        this.lastMessageId = data.lastMessage;
      } else {
        this.lastMessage = data.lastMessage;
        this.lastMessageId = this.lastMessage.id;
      }
    }
  }

  populate() {
    return Promise.all([
      this.populateAuthor(),
      this.populateParticipant()
    ])
    .then(() => {
      if(this.lastMessageId) {
        return this.populateLastMessage();
      } else {
        return this;
      }
    });
  }

  private populateAuthor() {
    return Users.findOne(this.authorId)
    .then((author: User) => {
      this.author = author;
      return this;
    });
  }

  private populateParticipant() {
    return Users.findOne(this.participantId)
    .then((participant: User) => {
      this.participant = participant;
      return this;
    });
  }

  private populateLastMessage() {
    return database()
    .ref(`/messages/${this.lastMessageId}`)
    .once("value")
    .then((snapshot) => {
      const fields = snapshot.val();
      const author = this.author.id == fields.author ? this.author : this.participant;
      this.lastMessage = new Message({ ...fields, id: this.lastMessageId, author });
      return this;
    });
  }

  private _save() {
    return database().
    ref(`/conversations/${this.id}`)
    .update(this.toFirebase())
    .then(() => {
      return this;
    });
  }

  accept() {
    this.accepted = true;
    return this._save();
  }

  sendMessage(from: User, text: string) {
    const message = new Message({ author: from, text, conversation: this.id });
    return message.save()
    .then(() => {
      this.lastMessageId = message.id;
      this.lastMessage = message;
      return this._save();
    });
  }


  private toFirebase() {
    const result: any = {
      accepted: this.accepted,
      author: this.authorId,
    };
    if(this.lastMessageId) {
      result.lastMessage = this.lastMessageId;
    }
    result[this.authorId] = "participant";
    result[this.participantId] = "participant";
    return result;
  }

  toJSON() {
    const result = pick(this, ["id", "accepted"]);
    result.author = this.author.toJSON();
    result.participant = this.participant.toJSON();
    if(this.lastMessage) {
      result.lastMessage = this.lastMessage.toJSON();
    }
    return result;
  }


}
