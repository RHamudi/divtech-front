import { useEffect, useState } from "react";
import axios from "axios";
import {MdDeleteForever} from "react-icons/md"
import {FiEdit} from "react-icons/fi"
import Link from 'next/link'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Table(){
    const [Fornecedores, setFornecedores] = useState();
    const [modalIsOpen, setIsOpen] = useState();

    useEffect(() => {
      async function getProducts() {
        await axios("http://localhost:5147/fornecedores/")
          .then((res) => setFornecedores(res.data))
          .catch((err) => console.log(err));
      }
      getProducts();
    }, []);

    async function DeletarFornecedor(id){ 
      await axios(`http://localhost:5147/fornecedores/${id}`, {
        method: "DELETE"
      })
      .then((res) => location.reload())
      .catch((err) => console.log(err))
    }


    if(Fornecedores)
    return (
        <>
        <div className="flex justify-center items-center w-full">
        <table class="min-w-full">
        <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nome
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                CNPJ
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Especialidade
              </th>
            </tr>
          </thead>
        {Fornecedores?.map((item)=> 
          <tbody>
            <tr class="border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.nome}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.cnpj}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.especialidade}
              </td>
              <td>
                <div onClick={() => DeletarFornecedor(item.id)}>
                  <MdDeleteForever  color="red" size={25} />
                </div>
              </td>
              <td>
                  <Link href={`/edit/${item.id}`}>
                  <FiEdit/>
                </Link>
                
              </td>
            </tr>
          </tbody>
        )}
        </table>
        </div>       
</>
)
}