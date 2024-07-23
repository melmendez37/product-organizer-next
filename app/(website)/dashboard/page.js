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
    <section className="p-8 space-y-6 min-h-screen flex flex-col bg-[#F2F2F2] dark:bg-slate-800">
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
          <table className="min-w-full leading-normal text-center">
            <thead>
              <tr>
                <th
                  className="px-5 py-3 text-lg font-bold text-center text-slate-300 
                bg-[#003B4A] dark:bg-black"
                >
                  Name
                </th>
                <th
                  className="px-5 py-3 text-lg font-bold text-center text-slate-300 
                bg-[#003B4A] dark:bg-black"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-3 text-sm font-normal text-center text-grey-800 border-b border-grey-200">
                    <Link
                      className="font-bold text-md"
                      href={`/dashboard/category/${category.id}/update`}>
                      {category.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm font-normal text-center flex justify-center items-center text-grey-800 border-b border-grey-200">
                    <Link
                    href={`/dashboard/category/${category.id}/update`}>
                    <Button>
                    Details
                    </Button>
                      
                    </Link>
                    <form action={deleteCategory}>
                      <input hidden defaultValue={category.id} name="id" />
                      <Button className="bg-red-500 hover:bg-red-400 ml-4" type="submit">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
