import Foundation
import Combine

class DiscoverViewModel: ObservableObject {
    @Published var profiles: [Profile] = []
    @Published var errorMessage: String?
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        fetchProfiles()
    }
    
    func fetchProfiles() {
        // TODO: Replace with actual API call
        profiles = [
            Profile(id: "1", name: "John Doe", role: "Producer", imageURL: "https://example.com/image1.jpg", audioPreviewURL: "https://example.com/audio1.mp3"),
            Profile(id: "2", name: "Jane Smith", role: "Vocalist", imageURL: "https://example.com/image2.jpg", audioPreviewURL: "https://example.com/audio2.mp3"),
            Profile(id: "3", name: "Mike Johnson", role: "Beatmaker", imageURL: "https://example.com/image3.jpg", audioPreviewURL: "https://example.com/audio3.mp3")
        ]
    }
    
    func like(profile: Profile) {
        // TODO: Implement like functionality with API call
        print("Liked profile: \(profile.name)")
    }
}

struct Profile: Identifiable {
    let id: String
    let name: String
    let role: String
    let imageURL: String
    let audioPreviewURL: String?
} 