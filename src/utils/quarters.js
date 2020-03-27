const quarters = [
  {
    value: "Alto das Palmeiras",
    label: "Alto das Palmeiras"
  },
  {
    value: "Altos da Monte Alegre",
    label: "Altos da Monte Alegre"
  },
  {
    value: "Altos do Indaiá",
    label: "Altos do Indaiá"
  },
  {
    value: "BNH 1º Plano",
    label: "BNH 1º Plano"
  },
  {
    value: "BNH 2º Plano",
    label: "BNH 2º Plano"
  },
  {
    value: "BNH 3º Plano",
    label: "BNH 3º Plano"
  },
  {
    value: "BNH 4º Plano",
    label: "BNH 4º Plano"
  },
  {
    value: "Bairro Jardim",
    label: "Bairro Jardim"
  },
  {
    value: "Cachoeirinha",
    label: "Cachoeirinha"
  },
  {
    value: "Canaã I",
    label: "Canaã I"
  },
  {
    value: "Canaã II",
    label: "Canaã II"
  },
  {
    value: "Canaã IV",
    label: "Canaã IV"
  },
  {
    value: "Canaã V",
    label: "Canaã V"
  },
  {
    value: "Canaã VI (Cachoeirinha)",
    label: "Canaã VI (Cachoeirinha)"
  },
  {
    value: "Centro",
    label: "Centro"
  },
  {
    value: "Chácara 38",
    label: "Chácara 38"
  },
  {
    value: "Chácara Califórnia",
    label: "Chácara Califórnia"
  },
  {
    value: "Chácara Flora",
    label: "Chácara Flora"
  },
  {
    value: "Chácaras Caiuás",
    label: "Chácaras Caiuás"
  },
  {
    value: "Cidade Áurea",
    label: "Cidade Áurea"
  },
  {
    value: "Cohab II",
    label: "Cohab II"
  },
  {
    value: "Conjunto Campo Dourado",
    label: "Conjunto Campo Dourado"
  },
  {
    value: "Conjunto Izidro Pedroso",
    label: "Conjunto Izidro Pedroso"
  },
  {
    value: "Conjunto Res. Monte Carlo",
    label: "Conjunto Res. Monte Carlo"
  },
  {
    value: "Jardim Alhambra",
    label: "Jardim Alhambra"
  },
  {
    value: "Jardim América",
    label: "Jardim América"
  },
  {
    value: "Jardim Apuena",
    label: "Jardim Apuena"
  },
  {
    value: "Jardim Aydê",
    label: "Jardim Aydê"
  },
  {
    value: "Jardim Bará",
    label: "Jardim Bará"
  },
  {
    value: "Jardim Brasília",
    label: "Jardim Brasília"
  },
  {
    value: "Jardim Caiman",
    label: "Jardim Caiman"
  },
  {
    value: "Jardim Caramuru",
    label: "Jardim Caramuru"
  },
  {
    value: "Jardim Carisma",
    label: "Jardim Carisma"
  },
  {
    value: "Jardim Cel. Francisco Alves",
    label: "Jardim Cel. Francisco Alves"
  },
  {
    value: "Jardim Central",
    label: "Jardim Central"
  },
  {
    value: "Jardim Clímax",
    label: "Jardim Clímax"
  },
  {
    value: "Jardim Coimasa",
    label: "Jardim Coimasa"
  },
  {
    value: "Jardim Colibri",
    label: "Jardim Colibri"
  },
  {
    value: "Jardim Continental",
    label: "Jardim Continental"
  },
  {
    value: "Jardim Cuiabazinho",
    label: "Jardim Cuiabazinho"
  },
  {
    value: "Jardim Del Rey",
    label: "Jardim Del Rey"
  },
  {
    value: "Jardim Europa",
    label: "Jardim Europa"
  },
  {
    value: "Jardim Faculdade",
    label: "Jardim Faculdade"
  },
  {
    value: "Jardim Flamboyant",
    label: "Jardim Flamboyant"
  },
  {
    value: "Jardim Flórida I",
    label: "Jardim Flórida I"
  },
  {
    value: "Jardim Flórida II",
    label: "Jardim Flórida II"
  },
  {
    value: "Jardim Girassol",
    label: "Jardim Girassol"
  },
  {
    value: "Jardim Guanabara",
    label: "Jardim Guanabara"
  },
  {
    value: "Jardim Guarujá",
    label: "Jardim Guarujá"
  },
  {
    value: "Jardim Independência",
    label: "Jardim Independência"
  },
  {
    value: "Jardim Itaipú",
    label: "Jardim Itaipú"
  },
  {
    value: "Jardim Itália",
    label: "Jardim Itália"
  },
  {
    value: "Jardim João Paulo II",
    label: "Jardim João Paulo II"
  },
  {
    value: "Jardim Jóquei Clube",
    label: "Jardim Jóquei Clube"
  },
  {
    value: "Jardim Laranja Doce",
    label: "Jardim Laranja Doce"
  },
  {
    value: "Jardim Leste",
    label: "Jardim Leste"
  },
  {
    value: "Jardim Londina",
    label: "Jardim Londina"
  },
  {
    value: "Jardim Maipu",
    label: "Jardim Maipu"
  },
  {
    value: "Jardim Mana",
    label: "Jardim Mana"
  },
  {
    value: "Jardim Manoel Rasselen",
    label: "Jardim Manoel Rasselen"
  },
  {
    value: "Jardim Marabá",
    label: "Jardim Marabá"
  },
  {
    value: "Jardim Maracanã",
    label: "Jardim Maracanã"
  },
  {
    value: "Jardim Maringá",
    label: "Jardim Maringá"
  },
  {
    value: "Jardim Marília",
    label: "Jardim Marília"
  },
  {
    value: "Jardim Mato Grosso",
    label: "Jardim Mato Grosso"
  },
  {
    value: "Jardim Monte Alegre",
    label: "Jardim Monte Alegre"
  },
  {
    value: "Jardim Monte Líbano",
    label: "Jardim Monte Líbano"
  },
  {
    value: "Jardim Morada do Salto",
    label: "Jardim Morada do Salto"
  },
  {
    value: "Jardim Murakami",
    label: "Jardim Murakami"
  },
  {
    value: "Jardim Márcia",
    label: "Jardim Márcia"
  },
  {
    value: "Jardim Mônaco",
    label: "Jardim Mônaco"
  },
  {
    value: "Jardim Novo Horizonte",
    label: "Jardim Novo Horizonte"
  },
  {
    value: "Jardim Olinda",
    label: "Jardim Olinda"
  },
  {
    value: "Jardim Ouro Verde",
    label: "Jardim Ouro Verde"
  },
  {
    value: "Jardim Paulista",
    label: "Jardim Paulista"
  },
  {
    value: "Jardim Pilau",
    label: "Jardim Pilau"
  },
  {
    value: "Jardim Piratininga",
    label: "Jardim Piratininga"
  },
  {
    value: "Jardim Rigotti",
    label: "Jardim Rigotti"
  },
  {
    value: "Jardim Santa Brígida",
    label: "Jardim Santa Brígida"
  },
  {
    value: "Jardim Santa Felicidade",
    label: "Jardim Santa Felicidade"
  },
  {
    value: "Jardim Santa Maria",
    label: "Jardim Santa Maria"
  },
  {
    value: "Jardim Santa Rita",
    label: "Jardim Santa Rita"
  },
  {
    value: "Jardim Santo André",
    label: "Jardim Santo André"
  },
  {
    value: "Jardim São Cristóvão",
    label: "Jardim São Cristóvão"
  },
  {
    value: "Jardim São Pedro",
    label: "Jardim São Pedro"
  },
  {
    value: "Jardim Tropical",
    label: "Jardim Tropical"
  },
  {
    value: "Jardim Universitário",
    label: "Jardim Universitário"
  },
  {
    value: "Jardim Valéria",
    label: "Jardim Valéria"
  },
  {
    value: "Jardim Vista Alegre",
    label: "Jardim Vista Alegre"
  },
  {
    value: "Jardim Zeina",
    label: "Jardim Zeina"
  },
  {
    value: "Jardim da Figueira",
    label: "Jardim da Figueira"
  },
  {
    value: "Jardim das Primaveras",
    label: "Jardim das Primaveras"
  },
  {
    value: "Jardim dos Estados",
    label: "Jardim dos Estados"
  },
  {
    value: "Mutirão da Moradia",
    label: "Mutirão da Moradia"
  },
  {
    value: "Outro",
    label: "Outro"
  },
  {
    value: "Panambi Verá",
    label: "Panambi Verá"
  },
  {
    value: "Parque Alvorada",
    label: "Parque Alvorada"
  },
  {
    value: "Parque Nova Dourados",
    label: "Parque Nova Dourados"
  },
  {
    value: "Parque Residencial Pelicano",
    label: "Parque Residencial Pelicano"
  },
  {
    value: "Parque Rincão I",
    label: "Parque Rincão I"
  },
  {
    value: "Parque Rincão II",
    label: "Parque Rincão II"
  },
  {
    value: "Parque das Nações I",
    label: "Parque das Nações I"
  },
  {
    value: "Parque das Nações II",
    label: "Parque das Nações II"
  },
  {
    value: "Parque do Lago I e II",
    label: "Parque do Lago I e II"
  },
  {
    value: "Parque dos Beija-Flores",
    label: "Parque dos Beija-Flores"
  },
  {
    value: "Parque dos Bem-te-vis",
    label: "Parque dos Bem-te-vis"
  },
  {
    value: "Parque dos Coqueiros I e II",
    label: "Parque dos Coqueiros I e II"
  },
  {
    value: "Parque dos Jequitibás",
    label: "Parque dos Jequitibás"
  },
  {
    value: "Parte Chácara",
    label: "Parte Chácara"
  },
  {
    value: "Parte do Centro (Leste)",
    label: "Parte do Centro (Leste)"
  },
  {
    value: "Parte do Centro (Oeste)",
    label: "Parte do Centro (Oeste)"
  },
  {
    value: "Portal de Dourados",
    label: "Portal de Dourados"
  },
  {
    value: "Prolongamento Itaipu",
    label: "Prolongamento Itaipu"
  },
  {
    value: "Residencial Oliveira I e II",
    label: "Residencial Oliveira I e II"
  },
  {
    value: "Residencial Valdomiro A. Monteiro",
    label: "Residencial Valdomiro A. Monteiro"
  },
  {
    value: "Residencial Ypacarai",
    label: "Residencial Ypacarai"
  },
  {
    value: "Terra Roxa I e II",
    label: "Terra Roxa I e II"
  },
  {
    value: "Vila Adelina I e II",
    label: "Vila Adelina I e II"
  },
  {
    value: "Vila Aimoré",
    label: "Vila Aimoré"
  },
  {
    value: "Vila Alba",
    label: "Vila Alba"
  },
  {
    value: "Vila Almeida",
    label: "Vila Almeida"
  },
  {
    value: "Vila Alvorada",
    label: "Vila Alvorada"
  },
  {
    value: "Vila Amaral",
    label: "Vila Amaral"
  },
  {
    value: "Vila Anete",
    label: "Vila Anete"
  },
  {
    value: "Vila Aracy",
    label: "Vila Aracy"
  },
  {
    value: "Vila Arapongas",
    label: "Vila Arapongas"
  },
  {
    value: "Vila Aurora",
    label: "Vila Aurora"
  },
  {
    value: "Vila Barros",
    label: "Vila Barros"
  },
  {
    value: "Vila Bela",
    label: "Vila Bela"
  },
  {
    value: "Vila Corumbá",
    label: "Vila Corumbá"
  },
  {
    value: "Vila Cuiabá",
    label: "Vila Cuiabá"
  },
  {
    value: "Vila Delfus",
    label: "Vila Delfus"
  },
  {
    value: "Vila Dourado",
    label: "Vila Dourado"
  },
  {
    value: "Vila Eldorado",
    label: "Vila Eldorado"
  },
  {
    value: "Vila Erondina I",
    label: "Vila Erondina I"
  },
  {
    value: "Vila Esperança",
    label: "Vila Esperança"
  },
  {
    value: "Vila Guarani",
    label: "Vila Guarani"
  },
  {
    value: "Vila Helena",
    label: "Vila Helena"
  },
  {
    value: "Vila Hilda",
    label: "Vila Hilda"
  },
  {
    value: "Vila Icassati",
    label: "Vila Icassati"
  },
  {
    value: "Vila Industrial",
    label: "Vila Industrial"
  },
  {
    value: "Vila Iran P. Matos",
    label: "Vila Iran P. Matos"
  },
  {
    value: "Vila Lili",
    label: "Vila Lili"
  },
  {
    value: "Vila Mariana",
    label: "Vila Mariana"
  },
  {
    value: "Vila Martins",
    label: "Vila Martins"
  },
  {
    value: "Vila Mary",
    label: "Vila Mary"
  },
  {
    value: "Vila Matos",
    label: "Vila Matos"
  },
  {
    value: "Vila Maxwel",
    label: "Vila Maxwel"
  },
  {
    value: "Vila Mello",
    label: "Vila Mello"
  },
  {
    value: "Vila Norte",
    label: "Vila Norte"
  },
  {
    value: "Vila Nossa Senhora Aparecida",
    label: "Vila Nossa Senhora Aparecida"
  },
  {
    value: "Vila Nova Esperança",
    label: "Vila Nova Esperança"
  },
  {
    value: "Vila Planalto",
    label: "Vila Planalto"
  },
  {
    value: "Vila Popular",
    label: "Vila Popular"
  },
  {
    value: "Vila Progresso",
    label: "Vila Progresso"
  },
  {
    value: "Vila Real",
    label: "Vila Real"
  },
  {
    value: "Vila Rosa",
    label: "Vila Rosa"
  },
  {
    value: "Vila Rui Barbosa",
    label: "Vila Rui Barbosa"
  },
  {
    value: "Vila Santa Catarina",
    label: "Vila Santa Catarina"
  },
  {
    value: "Vila Santa Clara",
    label: "Vila Santa Clara"
  },
  {
    value: "Vila Santa Hermínia",
    label: "Vila Santa Hermínia"
  },
  {
    value: "Vila Santana",
    label: "Vila Santana"
  },
  {
    value: "Vila Sulmat",
    label: "Vila Sulmat"
  },
  {
    value: "Vila São Braz",
    label: "Vila São Braz"
  },
  {
    value: "Vila São Francisco",
    label: "Vila São Francisco"
  },
  {
    value: "Vila São Jorge",
    label: "Vila São Jorge"
  },
  {
    value: "Vila São José",
    label: "Vila São José"
  },
  {
    value: "Vila São Luiz",
    label: "Vila São Luiz"
  },
  {
    value: "Vila Tonani",
    label: "Vila Tonani"
  },
  {
    value: "Vila Tonani I",
    label: "Vila Tonani I"
  },
  {
    value: "Vila Ubiratan",
    label: "Vila Ubiratan"
  },
  {
    value: "Vila Valderez",
    label: "Vila Valderez"
  },
  {
    value: "Vila Viegas",
    label: "Vila Viegas"
  },
  {
    value: "Vila Vieira",
    label: "Vila Vieira"
  },
  {
    value: "Vila Índio",
    label: "Vila Índio"
  }
];

export default quarters;
