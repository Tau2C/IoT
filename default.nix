{
  pkgs ? import <nixpkgs> {
    config = {
      allowUnfree = true;
    };
  },
}:
pkgs.mkShell rec {
  ANDROID_SDK_ROOT = "/home/tau2c/Android/Sdk";
  packages =
    with pkgs;
    [
      flutter
      android-tools
      jdk17
      cmake
      ninja
      libsecret

      pkg-config

      rustup
      cargo-expand
      vscode-extensions.rust-lang.rust-analyzer

      sqlite

      typescript

      nixfmt-rfc-style

      sqlite-web

      nodejs
    ]
    ++ (
      if pkgs.stdenv.isx86_64 then
        [
          android-studio
          bruno
        ]
      else
        [ ]
    )
    ++ (if pkgs.stdenv.isAarch64 then [ ] else [ ]);

  DATABASE_URL = "sqlite://server/iot.db";

  shellHook = ''
    export LD_LIBRARY_PATH=build/linux/x64/debug/bundle/lib:$LD_LIBRARY_PATH
    export PATH=~/.cargo/bin/:$PATH
  '';
}
