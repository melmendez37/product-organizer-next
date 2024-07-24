import { addCategory } from "@/lib/actions/add-category";
import { deleteCategory } from "@/lib/actions/delete-category";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";


const Dashboard = async () => {
  const user = await currentUser();
  const creator = user.name;
  const categories = await prisma.category.findMany({
    where: {
      creator: creator,
    },
  });

  return (
    <section className="p-8 space-y-6 min-h-screen flex flex-col bg-[#CECECE] dark:bg-slate-800">
      <div>
        <form 
          className="flex" 
          action={addCategory}
        >
          <input hidden 
            id="creator" 
            name="creator" 
            defaultValue={creator}
            />
          <Input name="name" id="name" placeholder="Enter a new category..."/>
          <Button className="bg-[#003B4A] text-slate-300 font-bold text-sm" type="submit">
            Add category
          </Button>
        </form>
      </div>

      {categories.length > 0 ? (
        <>
          <div className="min-w-full leading-normal text-center flex flex-row">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="px-5 py-3 text-sm font-normal text-center text-grey-800">
                    <div className="w-56 h-56 bg-black justify-center flex flex-2">
                      
                      <Link
                        className="font-bold text-md text-white"
                        href={`/dashboard/category/${category.id}/update`}>
                        {category.name}
                      </Link>

                      <Link 
                      href={`/dashboard/category/${category.id}/update`}>
                        <Button className="bg-[#9D9D9D] font-semibold">
                        Details
                        </Button>
                      </Link>

                      <form action={deleteCategory}>
                        <input hidden defaultValue={category.id} name="id"/>
                          <Button className="bg-red-500 hover:bg-red-400 ml-4 font-semibold" type="submit">
                            Delete
                          </Button>
                      </form>
                      
                    </div>
                  </div>
                </div>
              ))}
            
          </div>
        </>
      ) : (
        <>
          <div className="text-center">Add a category NOW</div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
