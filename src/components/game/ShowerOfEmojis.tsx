import { Box, Text} from "@chakra-ui/react";
import { useState, useEffect } from "react";


const emojis = ["🎉", "🚀", "🌈", "❤️", "😎", "B", "I", "N", "G", "O"];


const ShowerOfEmojis = () => {
  const [emojiList, setEmojiList] = useState<Array<{ top: number; left: number; emoji: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const newEmoji = {
        top: Math.floor(Math.random() * window.innerHeight),
        left: Math.floor(Math.random() * window.innerWidth),
        emoji: randomEmoji,
      };
      setEmojiList((prevList) => [...prevList, newEmoji]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box h="100vh" w="100vw" position="fixed" top="0" left="0" pointerEvents="none" zIndex="-1">
      {emojiList.map((emojiData, index) => (
        <Box key={index} position="absolute" top={emojiData.top} left={emojiData.left}>
          <Text fontSize={56}>{emojiData.emoji}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ShowerOfEmojis;
