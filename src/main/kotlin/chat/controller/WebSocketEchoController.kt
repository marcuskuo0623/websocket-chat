package chat.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("test")
@RestController
class WebSocketEchoController {

  @GetMapping("/hello")
  fun test():String {
    return "hello !"
  }
}