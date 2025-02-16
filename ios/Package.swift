// swift-tools-version:5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "MusicCollab",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(name: "MusicCollab", targets: ["MusicCollab"]),
    ],
    dependencies: [
        .package(url: "https://github.com/AudioKit/AudioKit.git", exact: "5.6.2"),
        .package(url: "https://github.com/AudioKit/AudioKitUI.git", exact: "5.6.2")
    ],
    targets: [
        .target(
            name: "MusicCollab",
            dependencies: [
                .product(name: "AudioKit", package: "AudioKit"),
                .product(name: "AudioKitUI", package: "AudioKitUI")
            ],
            path: "App/Sources",
            swiftSettings: [
                .define("SWIFT_ENABLE_BARE_SLASH_REGEX"),
                .unsafeFlags(["-enable-bare-slash-regex"])
            ]
        ),
        .testTarget(
            name: "MusicCollabTests",
            dependencies: ["MusicCollab"],
            path: "App/Tests"
        )
    ]
)
