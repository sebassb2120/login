import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "../assets/styles/stylest";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form"


export default function HomeScreen({navigation, route}) {

    // se define la informacion correspondiente al formulario que sera validado
    const {
        control,
        handleSubmit, reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          ident: "",
          fullname: "",
          email:"",
          password:"",
          creditlimit:""
        },
    })

    const onSave = (data) => console.log(data)

  return (
    <View style={styles.container}>

      <Text style={{marginTop:20}}>Bienvenido al sistema: {route.params.email}</Text> 

      
     <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 12,
          minLength:6,
          pattern:/^[0-9]+$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Identificación"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="ident"
      />
      {errors.ident?.type === "required" && <Text style={{color:'red',display:12}}> la Identificación es obligatoria</Text>}
      {errors.ident?.type === "maxLength" && <Text style={{color:'yellow',display:12}}> la cantidad de caracteres no puede ser mayor a 12</Text>}
      {errors.ident?.type === "minLength" && <Text style={{color:'yellow',display:12}}> la cantidad de caracteres no puede ser menor a 6</Text>}
      {errors.ident?.type === "pattern" && <Text style={{color:'red'}}> debes ingresar solo caracteres numericos </Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern:"[a-zA-Z ]{2,254}"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullname"
      />
      {errors.ident?.type === "required" && <Text style={{color:'red',display:12}}> El nombre completo es obligatoria</Text>}
      {errors.ident?.type === "pattern" && <Text style={{color:'red'}}> debes ingresar solo letras</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern:/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Correo Electronico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.ident?.type === "required" && <Text style={{color:'red',display:12}}> El Correo es obligatoria</Text>}
      {errors.ident?.type === "pattern" && <Text style={{color:'red'}}> Correo invalido, Prueba nuevamente</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 15,
          minLength:8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.ident?.type === "required" && <Text style={{color:'red',display:12}}> la contraseña es obligatoria</Text>}
      {errors.ident?.type === "maxLength" && <Text style={{color:'yellow',display:12}}> la cantidad de caracteres no puede ser mayor a 15</Text>}
      {errors.ident?.type === "minLength" && <Text style={{color:'yellow',display:12}}> la cantidad de caracteres no puede ser menor a 8</Text>}
      {errors.ident?.type === "pattern" && <Text style={{color:'red'}}> la contraseñaba debe tener almenos una mayúscula, minucula, un dígito, caracter especial, No espacios en blanco </Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\$[0-9]{1,3}([\\.][0-9]{3})/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="limite crediticio"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="creditlimit"
      /> 
      {errors.ident?.type === "required" && <Text style={{color:'red',display:12}}>El monto total es requerido </Text>}
      {errors.ident?.type === "pattern" && <Text style={{color:'red'}}>Solo se deben ingresar caracteres numericos, puntos y comas  </Text>}   




      <Button
         icon="contnt-save"
         style={{marginTop:5, backgroundColor:"orange"}}
         mode='outlined' 
         onPress={handleSubmit(onSave)}
        >
         Guardar
        </Button>
    </View>
  );
}
