rm -rf node_modules/electron
npm install
npm install --save --ignore-scripts git+https://github.com/greenheartgames/greenworks.git
cp -r ./bins/steamworks_sdk ./node_modules/greenworks/deps/steamworks_sdk
mv node_modules/greenworks/deps/steamworks_sdk/public/steam/lib/osx node_modules/greenworks/deps/steamworks_sdk/public/steam/lib/osx32
mv node_modules/greenworks/deps/steamworks_sdk/redistributable_bin/osx node_modules/greenworks/deps/steamworks_sdk/redistributable_bin/osx32
npm install
electron-builder install-app-deps