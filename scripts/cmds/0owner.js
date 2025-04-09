const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner2",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: 'sʜᴀᴍᴍᴏ sʜᴏʀᴋᴀʀ',
      gender: 'ᴍᴀʟᴇ',
      age: 'ᴜɴᴋɴᴏᴡɴ',
      height: 'ᴜɴᴋɴᴏᴡɴ',
      facebookLink: '',
      nick: 'sʜᴀᴍᴍᴏ'
    };

    const bold = 'https://v1.pinimg.com/videos/mc/720p/4f/72/81/4f728164f42b6d2c12685e9af2aee4ad.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
𝐎𝐰𝐧𝐞𝐫 2 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 : 𝗠𝗔𝗞𝗜𝗠𝗔 🤍✨

~ 𝗡𝗔𝗠𝗘: ${ownerInfo.name}

~ 𝗚𝗘𝗡𝗗𝗘𝗥: ${ownerInfo.gender}

~ 𝗔𝗚𝗘: ${ownerInfo.age}

~  𝗛𝗘𝗜𝗚𝗛𝗧: ${ownerInfo.height}

~ 𝗡𝗜𝗖𝗞: ${ownerInfo.nick}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
