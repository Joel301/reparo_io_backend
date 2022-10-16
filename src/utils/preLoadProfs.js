const preloadProfs =()=>{
   
    let aireAcondicionado = Profession.findOrCreate({
        where: { id: 1, name: "aire acondicionado", },
      });
    let albanil = Profession.findOrCreate({
        where: { id: 2, name: "albañil", },
      });
    let carpintero = Profession.findOrCreate({
       where: { id: 3, name: "carpintero",  },
      });
    let cerrajero = Profession.findOrCreate({
        where: { id: 4, name: "cerrajero", },
      });
    let electricista = Profession.findOrCreate({
        where: { id: 5, name: "electricista",  },
      });
    let gasista = Profession.findOrCreate({
        where: { id: 6, name: "gasista", },
      });
    let herrero = Profession.findOrCreate({
        where: { id: 7, name: "herrero",      },
      });
    let jardinero = Profession.findOrCreate({
        where: { id: 8, name: "jardinero",},
      });
    let mecanico = Profession.findOrCreate({
        where: { id: 9, name: "mecánico",     },
      });
    let plomero = Profession.findOrCreate({
        where: { id: 10, name: "plomero", },
      });
    let pintor = Profession.findOrCreate({
        where: { id: 11, name: "pintor",      },
      });
    let tecnicoPC = Profession.findOrCreate({
        where: { id: 12, name: "técnico PC",   },
    });
  
      Promise.all([
        aireAcondicionado,
        albanil,
        carpintero,
        cerrajero,
        electricista,
        gasista,
        herrero,
        jardinero,
        mecanico,
        plomero,
        pintor,
        tecnicoPC,
      ]).then(() => {
        console.log('preloaded Professions');
      })
}

module.export={
    preloadProfs
}