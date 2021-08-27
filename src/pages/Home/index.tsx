import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

interface Address {
  localidade: string;
  bairro: string;
  uf: string;
  logradouro: string;
  cep: string;
}

const Home: React.FC = () => {
  const [address, setAddress] = useState<Address | null>();
  const [query, setQuery] = useState("33855610");

  const onChange = (e: any) => {
    setQuery(e.target.value);
  };

  const getAddress = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${query}/json/`)
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
    setAddress(response);
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleInputSubmit = (e: any) => {
    e.preventDefault();
    getAddress();
  };

  return (
    <>
      <Card>
        <Input query={query} onChange={onChange} />
        <Button onClick={handleInputSubmit}>
          <GoSearch size={24} />
        </Button>
      </Card>
      {!!address && (
        <Card>
          <h3>Cidade de {address.localidade}</h3>
          <h3> {address.logradouro}</h3>
          <h3>Bairro {address.bairro}</h3>
          <h3>Estado {address.uf}</h3>
          <h3>CEP {address.cep}</h3>
        </Card>
      )}
    </>
  );
};

export default Home;
