import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId }) => {
  const [nome, setnome] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState("");
  const [cpf, setcpf] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (nome === "" || email === "") {
      setMessage({ error: true, msg: "" });
      return;
    }
    const newBook = {
      nome,
      email,
      status,
      cpf,
      tel,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "usuario atualizado!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "Novo usuario cadastrado!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setnome("");
    setemail("");
    setcpf("");
    settel("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setnome(docSnap.data().title);
      setemail(docSnap.data().author);
      setStatus(docSnap.data().status);
      setStatus(docSnap.data().cpf);
      setStatus(docSnap.data().tel);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nome">
            <InputGroup>
              <InputGroup.Text id="nome">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setnome(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <InputGroup>
              <InputGroup.Text id="email">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cpf">
            <InputGroup>
              <InputGroup.Text id="cpf">C</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cpf"
                value={cpf}
                onChange={(e) => setcpf(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tel">
            <InputGroup>
              <InputGroup.Text id="tel">D</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Telefone"
                value={tel}
                onChange={(e) => settel(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Ativo");
                setFlag(true);
              }}
            >
              Ativo
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Inativo");
                setFlag(false);
              }}
            >
              Inativo
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Adicionar / Atualizar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
