import {
  Button, Input, Textarea, useToast, VStack
} from "@chakra-ui/react"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import * as React from "react"
import { db } from "./firebase/firebase"
import { MultiSelect } from '@mantine/core';

export const App = () => {

  const [data, setData] = React.useState<string[]>([]);

  const [titulo, setTitulo] = React.useState("");
  const [autor, setAutor] = React.useState("");
  const [linkIcon, setLinkIcon] = React.useState("");
  const [linkCapa, setLinkCapa] = React.useState("");

  const [creepyPasta, setCreepypasta] = React.useState("");

  const [trigram, setTrigam] = React.useState<string[]>([]);

  const generateId = function () {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  };

  const toArray = () => {
    var arrayTitle = [];
    for (let i = 1; i < titulo.length + 1; i++) {
      arrayTitle.push(titulo.substring(0, i));
    }
    enviarD(arrayTitle);
  }

  const toast = useToast()
  const showMsg = () => {
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  async function enviarD(trigramParam: string[]) {
    await setDoc(doc(db, "creepypastas", generateId()), {
      title: titulo,
      autor: titulo,
      trigram: data,
      img: linkIcon,
      teller: creepyPasta,
      data: Timestamp.fromDate(new Date())
    }).then(() => {
      showMsg()

    });
    setData([])

  }

  return (

    <VStack m={"10"} textAlign="center" fontSize="xl">
      <Input placeholder="Título" value={titulo} onChange={(e) => {
        setTitulo(e.target.value)
      }} />
      <Input placeholder="Autor" value={autor} onChange={(e) => {
        setAutor(e.target.value)
      }} />
      <Input placeholder="link icon" value={linkIcon} onChange={(e) => {
        setLinkIcon(e.target.value)
      }} />
      <Input placeholder="link capa" value={linkCapa} onChange={(e) => {
        setLinkCapa(e.target.value)
      }} />
      <MultiSelect
        style={{ width: "100%" }}
        data={data}
        placeholder="Categorias e palavras chave"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => setData((current) => [...current, query.toLowerCase()])}
      />
      <Textarea h={"300px"} placeholder='Creepypasta aqui' value={creepyPasta} onChange={(e) => {
        setCreepypasta(e.target.value)
      }} />
      <VStack w={"full"} alignItems="start">
        <Button onClick={toArray} variant={"solid"} colorScheme={"green"}>Salvar</Button>
      </VStack>
    </VStack>

  )
}
