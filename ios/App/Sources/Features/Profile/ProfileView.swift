import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @StateObject private var viewModel = ProfileViewModel()
    @State private var isEditingProfile = false
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    HStack {
                        Spacer()
                        VStack {
                            if let imageURL = viewModel.profile?.imageURL {
                                AsyncImage(url: URL(string: imageURL)) { image in
                                    image
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                } placeholder: {
                                    Color.gray
                                }
                                .frame(width: 100, height: 100)
                                .clipShape(Circle())
                            }
                            
                            Text(viewModel.profile?.name ?? authViewModel.currentUser?.name ?? "")
                                .font(.title2)
                            
                            Text(viewModel.profile?.role ?? "")
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                        Spacer()
                    }
                    .padding(.vertical)
                }
                
                Section("Audio Sample") {
                    if let audioURL = viewModel.profile?.audioPreviewURL {
                        AudioPlayerView(audioURL: audioURL)
                    } else {
                        Text("No audio sample uploaded")
                            .foregroundColor(.gray)
                    }
                }
                
                Section("Account") {
                    NavigationLink("Edit Profile") {
                        ProfileEditView(profile: viewModel.profile ?? Profile(
                            id: authViewModel.currentUser?.id ?? "",
                            name: authViewModel.currentUser?.name ?? "",
                            role: authViewModel.currentUser?.role ?? "",
                            imageURL: authViewModel.currentUser?.imageURL,
                            audioPreviewURL: authViewModel.currentUser?.audioPreviewURL
                        ))
                    }
                    
                    Button(action: {
                        authViewModel.signOut()
                    }) {
                        Text("Sign Out")
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Profile")
        }
        .onAppear {
            viewModel.loadProfile()
        }
    }
}

struct ProfileEditView: View {
    let profile: Profile?
    @Environment(\.dismiss) var dismiss
    @State private var name: String
    @State private var role: String
    
    init(profile: Profile?) {
        self.profile = profile
        _name = State(initialValue: profile?.name ?? "")
        _role = State(initialValue: profile?.role ?? "")
    }
    
    var body: some View {
        Form {
            Section {
                TextField("Name", text: $name)
                TextField("Role", text: $role)
            }
            
            Section("Profile Picture") {
                Button("Change Picture") {
                    // TODO: Implement image picker
                }
            }
            
            Section("Audio Sample") {
                Button("Upload Audio") {
                    // TODO: Implement audio picker
                }
            }
            
            Section {
                Button("Save Changes") {
                    // TODO: Implement save functionality
                    dismiss()
                }
            }
        }
        .navigationTitle("Edit Profile")
        .navigationBarTitleDisplayMode(.inline)
    }
}

class ProfileViewModel: ObservableObject {
    @Published var profile: Profile?
    @Published var errorMessage: String?
    
    func loadProfile() {
        // TODO: Replace with actual API call
        profile = Profile(
            id: "1",
            name: "John Doe",
            role: "Producer",
            imageURL: "https://example.com/image1.jpg",
            audioPreviewURL: "https://example.com/audio1.mp3"
        )
    }
} 