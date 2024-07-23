'use server'

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function deleteCategory(formData){
    try {
        const id = formData.get('id');
        await prisma.category.delete({
            where:{
                id, 
            }
        })
    } catch (error) {
        console.log('Error. ' + error)
    }

    revalidatePath("/dashboard")
}