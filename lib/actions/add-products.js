'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "../prisma"

export async function addProducts(formData){
    const { name, categoryId } = Object.fromEntries(formData)
    try{
        newProduct = await prisma.product.create({
            data: {
                name, categoryId
            }
        })
    } catch (error){
        console.log("Error: " + error)
    }
    revalidatePath("/dashboard")
    redirect("/")
}