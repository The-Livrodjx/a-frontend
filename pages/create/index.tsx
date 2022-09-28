import { 
  Alert, 
  AlertDescription, 
  AlertIcon, 
  Button, 
  Flex, 
  Input 
} from "@chakra-ui/react";
import DropFile from "../components/DropFile";
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { FileContext } from "../contexts/FileContext";
import { ITags } from "../../services/hooks/useMedias";
import { UserContext } from "../contexts/UserContext";

export default function Create() {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .required('Title is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors }: any = formState;
  const [error, setError] = useState("");
  const [tags, setTags] = useState<ITags[]>();
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);
  const { file, setHasPreview } = useContext(FileContext);
  const { email } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await api.get('/tags/');
  
      setTags(response.data);
    };
    fetchData();
  },[])

  const handleChange = (e: {target: HTMLSelectElement}) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTags(value);
  }

  const onSubmit = async (data: FieldValues) => {
    if(!file) {
      setError("No file was choosen");
      return false;
    }
    setError('');
    const { title } = data;

    let body = {
      title,
      users: {
        email: email
      },
      tags: selectedTags
    };

    let formData = new FormData();
    
    formData.append('file', file[0], file[0].name);
    formData.append('body', JSON.stringify(body));

    api.post('/medias', formData)
      .then(() => {
        reset();
        setHasPreview(false);
      })
      .catch(() => {
        reset();
        setError("Something goes wrong");
      })
  };

  return (
    <>
      <Flex
        w="100vw"
        h="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <DropFile />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {(Object.entries(errors).length > 0) && (
            <>
              {Object.entries(errors).map((error: [string, any], index: number) => (
                <>
                  <Alert status='error' key={error[1].message}>
                    <AlertIcon />
                    <AlertDescription>{error[1].message}</AlertDescription>
                  </Alert>
                </>
              ))}
            </>
          )}

          {error !== "" && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <select 
            style={{
              padding: 8,
            }}
            className="select-multiple"
            multiple={true}
            name="selectOptions"
            onChange={handleChange}
          >
            <option 
              style={{color: '#222'}} 
              value="none" disabled>
                Select Video Tags
            </option>
            {tags?.map((tag: ITags) => (
              <option 
                key={tag.id} 
                style={{color: '#222'}} 
                value={`{"id": ${tag.id}, "name": "${tag.name}"}`}>{tag.name}
              </option>
            ))}
        
          </select>
          <Input
            my={8}
            type="text"
            w={{base: "200px", md: "300px", lg: "400px"}}
            placeholder='Title'
            focusBorderColor="#fa5e78"
            defaultValue=""
            {...register('title')}
            onChange={() => { }}
          />

          <Button
            bg="#fa5e78"
            color="#ffffff"
            p={6}
            type="submit"
          >Create Video</Button>
        </form>
      </Flex>
    </>
  );
}