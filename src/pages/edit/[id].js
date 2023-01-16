import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

export default function edit(){
  const Router = useRouter();
  const id = Router.query.id;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data)
        axios(`http://localhost:5147/fornecedores/${id}`, {
          method: "PATCH",
          data: data
        })
          .then((res) => Router.push('/'))
          .catch((err) => console.log(err));
      };

      var Especialidades = ["Comércio", "Serviço", "Indústria"]

    return (
        <div className="flex flex-col justify-center items-center">
      <h1 className="py-2">Atualizar Fornecedor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex flex-col gap-5">
            Nome
            <input
              {...register("Nome", { required: true })}
              type="text"
              className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </label>
            <label className="flex flex-col gap-5">
            CNPJ
            <input
              {...register("CNPJ", { required: true, minLength: 14, maxLength: 14 })}
              type="text"
              className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            
            </label>
            <label className="flex flex-col gap-5">
            Especialidade
            <select {...register("Especialidade")} className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option hidden>Selecione</option>
              {Especialidades.map((item, index) => 
                <option key={index} value={item}>
                  {item}
                </option>)}
            </select>
            </label>
          
        </div>
        <button type="submit" className="bg-blue-900 rounded-md p-1 my-2 text-white">
          Atualizar Fornecedor
        </button>
      </form>
    </div>
    )
}