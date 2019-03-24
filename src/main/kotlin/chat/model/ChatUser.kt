package chat.model

import chat.model.typehandler.NoArg

@NoArg
data class ChatUser(
    val name: String,
    val content: String
)