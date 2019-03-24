package chat.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestBody
import chat.model.ChatUser

@Controller
class WebSocketMessageController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    fun showUserMessage(@RequestBody user: ChatUser): ChatUser {
        return ChatUser(user.name, user.content)
    }
}
