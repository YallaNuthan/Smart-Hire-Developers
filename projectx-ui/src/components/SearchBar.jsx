import { Input, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <HStack>
      <Input
        placeholder='“Sr. Python + AWS dev, 6 yrs…”'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button onClick={() => onSubmit(text)}>Parse</Button>
    </HStack>
  );
}
