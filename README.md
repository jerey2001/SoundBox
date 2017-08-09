SoundBox react-native
===================

Prerequisite
-------------------
For Ubuntu:

- NodeJS:
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- Androiud SDK (or maybe not. I will try without)
```
wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
unzip sdk-tools-linux-3859397.zip
sudo mkdir -p /usr/local/android
sudo mv tools /usr/local/android/
sudo chmod a+rw -R /usr/local/android
export PATH=$PATH:/usr/local/android/tools/:/usr/local/android/tools/bin/
mkdir $HOME/.android/ && touch $HOME/.android/repositories.cfg
/usr/local/android/tools/android update sdk
/usr/local/android/tools/bin/sdkmanager --licenses
/usr/local/android/tools/bin/sdkmanager "platforms;android-26"
```

- Install react-native:
```
sudo npm install -g react-native-cli
sudo npm install -g create-react-native-app

```

How to use (if you want to make some devs, else just install the APK on your device)
-------------------

- clone this repo
- enter the dir:

```
cd SoundBox
```
- install deps:
```
npm install
```

- connect your physical device (if you don't want to use emulator)
just follow this tutorial: https://facebook.github.io/react-native/docs/running-on-device.html

- run the app:
```
react-native run-android
```
**Tip:** Your computer and your device must be on the same wifi/eth network
**Tip 2:** Your device must NOT be on charge only (select file transfer mode)
**Tip 3:** Don't forget to enable USB debugging mode (on developper option after enable it)
