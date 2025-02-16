import SwiftUI
import AudioKit
import AudioKitUI

@main
struct MusicCollabApp: App {
    @StateObject private var authViewModel = AuthViewModel()
    
    var body: some Scene {
        WindowGroup {
            if authViewModel.isAuthenticated {
                MainTabView()
                    .environmentObject(authViewModel)
            } else {
                AuthView()
                    .environmentObject(authViewModel)
            }
        }
    }
}

// Simplified AuthViewModel without Firebase
class AuthViewModel: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    @Published var errorMessage: String?
    
    func signIn(email: String, password: String) {
        // Simplified auth for testing
        isAuthenticated = true
        currentUser = User(
            id: "1",
            email: email,
            name: "Test User",
            role: "Producer"
        )
    }
    
    func signUp(email: String, password: String) {
        signIn(email: email, password: password)
    }
    
    func signOut() {
        isAuthenticated = false
        currentUser = nil
    }
}

struct User {
    let id: String
    let email: String
    let name: String
    var role: String?
    var imageURL: String?
    var audioPreviewURL: String?
} 