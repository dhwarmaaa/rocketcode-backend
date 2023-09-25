var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const cors = require("cors"); // Importa el middleware CORS
const sequelize = require("./db");
const Persona = require("./Users");

var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }

  type Mutation {
    createPerson(personInput: PersonInput!): Person
  }

  input PersonInput {
    name: PersonNameInput!
    birthDate: BirthDateInput!
    contact: ContactInput!
  }

  type Person {
    name: PersonName!
    birthDate: BirthDate!
    contact: Contact!
  }

  type PersonName {
    firstName: String!
    middleName: String
    lastName: String!
    maternalLastName: String!
  }

  input PersonNameInput {
    firstName: String!
    middleName: String
    lastName: String!
    maternalLastName: String!
  }

  type BirthDate {
    year: Int!
    month: String!
    day: Int!
  }

  input BirthDateInput {
    year: Int!
    month: String!
    day: Int!
  }

  type Contact {
    email: String
    phone: String
  }

  input ContactInput {
    email: String
    phone: String
  }
`);

const meses = {
  enero: 00,
  febrero: 01,
  marzo: 02,
  abril: 03,
  mayo: 04,
  junio: 05,
  julio: 06,
  agosto: 07,
  septiembre: 08,
  octubre: 09,
  noviembre: 10,
  diciembre: 11,
};

// The root provides a resolver function for each API endpoint
var root = {
  createPerson: async ({ personInput }) => {
    try {
      const nuevaPersona = await Persona.create({
        Nombre: personInput.name.firstName, // Aquí se corrige el nombre
        "Segundo Nombre": personInput.name.middleName, // Aquí se corrige el nombre
        "Apellido Paterno": personInput.name.lastName, // Aquí se corrige el nombre
        "Apellido Materno": personInput.name.maternalLastName, // Aquí se corrige el nombre
        "Fecha de Nacimiento": new Date(
          personInput.birthDate.year,
          meses[personInput.birthDate.month],
          personInput.birthDate.day
        ), // Aquí se corrige el nombre y la construcción de la fecha
        Email: personInput.contact.email, // Aquí se corrige el nombre
        Teléfono: personInput.contact.phone, // Aquí se corrige el nombre
      });
      console.log(nuevaPersona);
      return personInput;
    } catch (error) {
      console.log(error);
      throw new Error("Ocurrió un error al crear la persona");
    }
  },
};

var app = express();

// Habilita CORS para evitar el bloqueo de solicitudes
app.use(cors());

/*
  configuracion del endpoint /graphql en la aplicación Express para servir una 
  interfaz de usuario de GraphiQL y manejar solicitudes GraphQL.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
