import SwiftUI

struct ChatView: View {
    let conversation: Conversation
    @StateObject private var viewModel = ChatViewModel()
    @State private var messageText = ""
    
    var body: some View {
        VStack {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 12) {
                        ForEach(viewModel.messages) { message in
                            MessageBubble(message: message, isFromCurrentUser: message.senderId == "1")
                        }
                    }
                    .padding()
                }
                .onChange(of: viewModel.messages) { _ in
                    if let lastMessage = viewModel.messages.last {
                        proxy.scrollTo(lastMessage.id, anchor: .bottom)
                    }
                }
            }
            
            HStack {
                TextField("Message", text: $messageText)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                
                Button(action: {
                    viewModel.sendMessage(content: messageText)
                    messageText = ""
                }) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.blue)
                }
            }
            .padding()
        }
        .navigationTitle(conversation.otherUser.name)
        .onAppear {
            viewModel.loadMessages(for: conversation.id)
        }
    }
}

struct MessageBubble: View {
    let message: Message
    let isFromCurrentUser: Bool
    
    var body: some View {
        HStack {
            if isFromCurrentUser { Spacer() }
            
            VStack(alignment: isFromCurrentUser ? .trailing : .leading) {
                Text(message.content)
                    .padding(10)
                    .background(isFromCurrentUser ? Color.blue : Color.gray.opacity(0.3))
                    .foregroundColor(isFromCurrentUser ? .white : .primary)
                    .cornerRadius(15)
                
                Text(message.timestamp, style: .time)
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            if !isFromCurrentUser { Spacer() }
        }
    }
}

class ChatViewModel: ObservableObject {
    @Published var messages: [Message] = []
    @Published var errorMessage: String?
    
    func loadMessages(for conversationId: String) {
        // TODO: Replace with actual API call
        messages = [
            Message(id: "1", content: "Hey, I liked your track!", timestamp: Date().addingTimeInterval(-3600), senderId: "2"),
            Message(id: "2", content: "Thanks! Would you like to collaborate?", timestamp: Date().addingTimeInterval(-3500), senderId: "1"),
            Message(id: "3", content: "Absolutely! I have some ideas", timestamp: Date().addingTimeInterval(-3400), senderId: "2"),
            Message(id: "4", content: "Great! Let me send you a demo", timestamp: Date().addingTimeInterval(-3300), senderId: "1")
        ]
    }
    
    func sendMessage(content: String) {
        guard !content.isEmpty else { return }
        
        // TODO: Replace with actual API call
        let newMessage = Message(id: UUID().uuidString, content: content, timestamp: Date(), senderId: "1")
        messages.append(newMessage)
    }
} 