import { addProducts } from "@/lib/actions/add-products"
import { deleteProducts } from "@/lib/actions/delete-products"
import { updateCategory } from "@/lib/actions/update-category"
import prisma from "@/lib/prisma"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"

const UpdateCategory = async({params}) => {
  const id = params.id
  const data = await prisma.category.findUnique({
    where: {
      id: id
    },
    include:{
      products: true
    }
  })
  return (
    <section className="p-8 space-y-6 min-h-screen flex flex-col bg-slate-300 dark:bg-slate-800">
    <div className="px-4 py-2 flex justify-between">
    <h1 className="uppercase font-bold text-xl dark:text-slate-300 text-black">{data.name}</h1>
      <Link className="dark:text-[#F2F2F2] text-black opacity-50 underline italic" href={`/dashboard`}>Back</Link>
    </div>
    <div className="border border-slate-600 rounded-md p-8 dark:bg-slate-900">
      <div>
        <h1 className="font-bold text-md mt-4 mb-4 dark:text-slate-300 text-black">Update category name</h1>
        <form
          action={updateCategory}
          className="flex items-center">
          <input hidden defaultValue={data.id} name="id"/>
          <Input defaultValue={data.name} name="name" id="name"/>
          <Button className="border border-slate-500 dark:border-slate-500 
          bg-transparent text-slate-600 dark:text-slate-400 
          hover:bg-slate-500 font-semibold" type="submit">Update</Button>
        </form>
      </div>
      <h2 className="dark:text-slate-300 font-bold 
      text-md text-left mt-16 mb-4">Add products here</h2>
      <div>
        <form
          className="flex"
          action={addProducts}>
          <input hidden name="categoryId" defaultValue={data.id}/>
          <Input placeholder="Add new product here" name="name" id="name"/>
          <Button className="border border-slate-500 dark:border-slate-500 
          bg-transparent text-slate-600 dark:text-slate-400 
          hover:bg-slate-500 font-semibold" type="submit">Add product</Button>
        </form>
      </div>
    </div>
    <div className="px-4 py-2">
      <h1 className=" italic font-bold text-xl dark:text-slate-300 text-black">PRODUCTS</h1>
    </div>
    {data.products.length > 0 ? (
      <>
        
        <div className="min-w-full leading-normal text-center flex flex-row">
            {data.products.map((product) => (
              <div key={product.id}>
                <div className="px-4">
                  <div>
                    <div className="w-56 h-32 items-center justify-center
                        bg-transparent border border-slate-600 text-slate-600 
                        dark:bg-slate-900 dark:text-slate-400 flex flex-2 
                        rounded-md font-bold text-lg">
                      {product.name}
                    </div>
                    <div className="mt-4 justify-center flex">
                      <form action={deleteProducts}>
                        <input hidden id="id" name="id" defaultValue={product.id} type="text" />
                        <Button type="submit" className="bg-transparent hover:bg-red-100 
                        text-red-500 border border-red-500 font-semibold">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
       
        </div>
      </>
    ) : (
      <>
        <div className="font-bold text-md mb-4 text-center mt-4">Oops! Seems like you have no products. Let's fix that..</div>
      </>
    ) }
    </section>
  )
}

export default UpdateCategory