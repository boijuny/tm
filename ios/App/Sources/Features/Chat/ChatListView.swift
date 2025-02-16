import SwiftUI

struct ChatListView: View {
    @StateObject private var viewModel = ChatListViewModel()
    
    var body: some View {
        NavigationView {
            List(viewModel.conversations) { conversation in
                NavigationLink(destination: ChatView(conversation: conversation)) {
                    ChatRow(conversation: conversation)
                }
            }
            .navigationTitle("Messages")
            .refreshable {
                await viewModel.fetchConversations()
            }
        }
    }
}

struct ChatRow: View {
    let conversation: Conversation
    
    var body: some View {
        HStack {
            AsyncImage(url: URL(string: conversation.otherUser.imageURL)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray
            }
            .frame(width: 50, height: 50)
            .clipShape(Circle())
            
            VStack(alignment: .leading) {
                Text(conversation.otherUser.name)
                    .font(.headline)
                
                Text(conversation.lastMessage?.content ?? "No messages yet")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            if let date = conversation.lastMessage?.timestamp {
                Text(date, style: .time)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
        .padding(.vertical, 8)
    }
}

class ChatListViewModel: ObservableObject {
    @Published var conversations: [Conversation] = []
    @Published var errorMessage: String?
    
    @MainActor
    func fetchConversations() async {
        // TODO: Replace with actual API call
        conversations = [
            Conversation(
                id: "1",
                otherUser: Profile(id: "2", name: "Jane Smith", role: "Vocalist", imageURL: "https://example.com/image2.jpg", audioPreviewURL: nil),
                lastMessage: Message(id: "1", content: "Hey, I liked your track!", timestamp: Date(), senderId: "2")
            ),
            Conversation(
                id: "2",
                otherUser: Profile(id: "3", name: "Mike Johnson", role: "Beatmaker", imageURL: "https://example.com/image3.jpg", audioPreviewURL: nil),
                lastMessage: Message(id: "2", content: "Let's collaborate!", timestamp: Date().addingTimeInterval(-3600), senderId: "1")
            )
        ]
    }
}

struct Conversation: Identifiable {
    let id: String
    let otherUser: Profile
    let lastMessage: Message?
}

struct Message: Identifiable {
    let id: String
    let content: String
    let timestamp: Date
    let senderId: String
} 