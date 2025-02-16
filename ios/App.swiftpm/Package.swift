// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MusicCollabApp",
    platforms: [
        .iOS(.v16)
    ],
    products: [
        .iOSApplication(
            name: "MusicCollab",
            targets: ["MusicCollabApp"],
            bundleIdentifier: "com.musiccollab.app",
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder,
            accentColor: .presetColor(.blue),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/AudioKit/AudioKit.git", exact: "5.6.2"),
        .package(url: "https://github.com/AudioKit/AudioKitUI.git", exact: "5.6.2")
    ],
    targets: [
        .executableTarget(
            name: "MusicCollabApp",
            dependencies: [
                .product(name: "AudioKit", package: "AudioKit"),
                .product(name: "AudioKitUI", package: "AudioKitUI")
            ],
            path: "Sources"
        )
    ]
) 