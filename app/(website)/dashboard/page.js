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
    <section
        className="p-8 space-y-6 min-h-screen flex flex-col
      bg-slate-300 dark:bg-slate-800">
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
          <Button className="bg-[#003B4A] dark:bg-slate-900 text-slate-300 font-bold text-sm" type="submit">
            Add category
          </Button>
        </form>
      </div>

      {categories.length > 0 ? (
        <>
          <div className="min-w-full leading-normal text-center flex flex-row">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="px-5 py-3">
                    <div>
                      <Link
                        className="w-56 h-40 items-center justify-center
                        border border-slate-600 text-slate-300 dark:border-slate-400 bg-transparent dark:bg-slate-900 dark:text-slate-400 hover:opacity-80 hover
                        flex flex-2 rounded-md  font-bold text-lg"
                        href={`/dashboard/category/${category.id}/update`}>
                        {category.name}
                      </Link>
                    </div>
                    <div className="mt-4 justify-center flex flex-2">
                        <Link 
                          href={`/dashboard/category/${category.id}/update`}>
                            <Button className="border text-slate-600 border-slate-600 bg-transparent dark:text-slate-400 hover:bg-slate-500 hover:opacity-40 font-semibold">
                            Details
                            </Button>
                        </Link>

                        <form action={deleteCategory}>
                          <input hidden defaultValue={category.id} name="id"/>
                            <Button
                              className="hover:bg-red-200 text-red-500 border border-red-500 hover:opacity-60 bg-transparent ml-4 font-semibold"
                              type="submit">
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
          <div className="text-center font-bold text-xl text-[#003B4A]">Oops! Looks like you have no categories here.</div>
          <div className="text-center font-extrabold text-xl text-[#003B4A]">Add a category now.</div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
