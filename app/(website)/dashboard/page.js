import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
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
    <section className="p-24 space-y-6 min-h-screen flex flex-col ">
      <div>Add category</div>
      {categories.length > 0 ? (
        <>
          <table className="min-w-full leading-normal text-center">
            <thead>
              <tr>
                <th
                  className="px-5 py-3 text-sm font-normal text-center text-grey-800 
                bg-white border-b border-grey-200"
                >
                  Name
                </th>
                <th
                  className="px-5 py-3 text-sm font-normal text-center text-grey-800 
                bg-white border-b border-grey-200"
                >
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-3 text-sm font-normal text-center text-grey-800 border-b border-grey-200">
                    <Link href={`/dashboard/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm font-normal text-center text-grey-800 border-b border-grey-200">
                    <Link href={`/dashboard/category/${category.id}/update`}>
                      Details
                    </Link>
                    Delete
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
