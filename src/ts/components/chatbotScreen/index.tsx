import * as React from "react";

import {AppState} from "../../store";

//BotFramework Chat Wrapper
import {Chat} from "botframework-webchat";

export interface ChatBotScreenProps {
  appState : AppState;
  setAppState : (newState : any) => void;
}

export interface ChatBotScreenState {}

export default class ChatBotScreen extends React.Component < ChatBotScreenProps,
ChatBotScreenState > {

  constructor(props : ChatBotScreenProps) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div
        className="screen"
        style={{
        width: "100%",
        height: "100%"
      }}>
        <div className="chatbot-container">
          {/*<div className="chatbot-info">Chatbot Info Area</div>*/}
          <div className="chatbot">
            {/*< Chat
            bot = {{
              id: "me"
            }}
            directLine = {{
              secret: "direct_line_secret"
            }}
            user = {{
              id: 'user_id',
              name: 'user_name'
            }}
          adaptiveCardsHostConfig = {{}}/>*/}
            {/*<Chat
              adaptiveCardsHostConfig={null}
              bot={{
              id: "myId"
            }}
              directLine={{
              secret: "ZcagLJZtx24.cwA.YtA.8Pcx3Xx_uwoqLFEhYavEHKUutuL7_qnEC1fqU8KgmL4"
            }}
              user={{
              id: 'id',
              name: 'IslemPenywis'
            }}/>*/}
            <iframe
              src='https://webchat.botframework.com/embed/Nateq-Hajj?s=ZcagLJZtx24.cwA.YtA.8Pcx3Xx_uwoqLFEhYavEHKUutuL7_qnEC1fqU8KgmL4'></iframe>
          </div>
        </div>
      </div>
    );

  }

}