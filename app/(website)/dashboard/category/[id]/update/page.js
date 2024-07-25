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
    <section className="p-8 space-y-6 min-h-screen flex flex-col bg-[#CECECE] dark:bg-slate-800">
    <div>
      <Link className="dark:text-[#F2F2F2] text-black opacity-50 underline italic" href={`/dashboard`}>Back</Link>
      <h1 className="font-bold text-md mt-4 mb-4 dark:text-[#F2F2F2] text-black">Update Category</h1>
      <form
        action={updateCategory}
        className="flex items-center">

        <input hidden defaultValue={data.id} name="id"/>
        <Input defaultValue={data.name} name="name" id="name"/>
        <Button className="bg-slate-900 text-[#F2F2F2] font-bold text-sm" type="submit">Update</Button>
      </form>
    </div>
    <h2 className="font-bold text-md text-left uppercase mt-16">Products under {data.name}</h2>
    <div>
      <form
        className="flex"
        action={addProducts}>
        <input hidden name="categoryId" defaultValue={data.id}/>
        <Input placeholder="name" name="name" id="name"/>
        <Button className="bg-slate-900 text-[#F2F2F2] font-bold text-sm" type="submit">Add product</Button>
      </form>
    </div>
    {data.products.length > 0 ? (
      <>
        
        <div className="min-w-full leading-normal text-center flex flex-row">
            {data.products.map((product) => (
              <div key={product.id}>
                <div className="px-5 py-5">
                  <div>
                    <div className="w-56 h-32 items-center justify-center
                        bg-[#F2F2F2] dark:bg-slate-900 dark:text-[rgb(242,242,242)] flex flex-2 rounded-md text-black font-bold text-lg">
                      {product.name}
                    </div>
                    <div className="mt-4 justify-center flex">
                      <form action={deleteProducts}>
                        <input hidden id="id" name="id" defaultValue={product.id} type="text" />
                        <Button type="submit" className="bg-transparent hover:bg-red-100 text-red-500 border border-red-500 font-semibold">
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