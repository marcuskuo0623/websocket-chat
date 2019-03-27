package chat.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import chat.model.ChatUser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping

@Controller
class WebSocketMessageController {

  @Autowired
  private lateinit var simpMessageTemplate: SimpMessagingTemplate

  @MessageMapping("/chat")
  @SendTo("/topic/user/allMessage")
  fun showUserAllMessage(@RequestBody user: ChatUser): ChatUser {
    return ChatUser(user.name, user.content)
  }

  @MessageMapping("/chat/{sendUser}")
  fun showUserMessageByName(@DestinationVariable("sendUser") sendUser: String,
                            @RequestBody user: ChatUser): String {
    simpMessageTemplate.convertAndSend("/topic/user/${user.name}", ChatUser(user.name, user.content))
    simpMessageTemplate.convertAndSend("/topic/user/$sendUser", ChatUser(user.name, user.content))
    return "ok"
  }
}
