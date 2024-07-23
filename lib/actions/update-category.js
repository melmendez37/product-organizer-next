'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "../prisma"

export async function updateCategory(formData){
    const { name, id } = Object.fromEntries(formData)
    try{
        updateCategory = await prisma.category.update({
            where: {
                id: id
            },
            data:{
                name: name
            }
        })
    } catch (error){
        console.log("Error: " + error)
    }
    revalidatePath("/dashboard")
    redirect("/dashboard")
}