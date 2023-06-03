import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";

function Formulario() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [pais, setPais] = useState('');

  useEffect(() => {
    if (noticias.length === 0) {
      consultarAPI();
    }
  }, [categoria]);

  useEffect(() => {
    consultarAPI();
  }, [categoria, pais]);

  const consultarAPI = async () => {
    try {
      if (categoria !== "" && pais !== "") {
        const respuesta = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${categoria}/${pais}.json`);
        const datos = await respuesta.json();
        setNoticias(datos.articles);
      }
    } catch (error) {
      console.error("Error al consultar la API:", error);
    }
  };

  return (
    <Container className="my-5 border border-secondary border-1 ">
      <Form>
        <Form.Group className="mt-5 border-secondary d-flex justify-content-center" controlId="categoriaForm">
          <Form.Label className="d-inline fs-5">Buscar por Categoría: </Form.Label>
          <Form.Select className="ms-4 mb-5 w-50" aria-label="Categoría" onChange={(e) => setCategoria(e.target.value)} value={categoria}>
            <option value=''>Categorías</option>
            <option value="business">Negocios</option>
            <option value="entertainment">Entretenimiento</option>
            <option value="general">General</option>
            <option value="health">Salud</option>
            <option value="science">Ciencia</option>
            <option value="sports">Deportes</option>
            <option value="technology">Tecnología</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-5 border-secondary d-flex justify-content-center" controlId="paisForm">
          <Form.Label className="d-inline fs-5">Buscar por País: </Form.Label>
          <Form.Select className="ms-4 mb-5 w-50" aria-label="País" onChange={(e) => setPais(e.target.value)} value={pais}>
            <option value=''>Países</option>
            <option value="in">India</option>
            <option value="us">USA</option>
            <option value="au">Australia</option>
            <option value="ru">Rusia</option>
            <option value="fr">Francia</option>
            <option value="gb">Reino Unido</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <ListaNoticias noticias={noticias} />
    </Container>
  );
}

export default Formulario;