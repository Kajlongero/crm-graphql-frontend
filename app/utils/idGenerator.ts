export default function idGenerator() {
  const id = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321";
  let newId = "";
  for(let i=0; i<24; i++) {
    newId += `${id.charAt(Math.floor(Math.random() * id.length - 1))}`;
  }
  return newId;
}