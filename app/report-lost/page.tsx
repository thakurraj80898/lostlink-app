"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportItemSchema, type ReportItemFormData } from "@/lib/validations";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ReportLost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ReportItemFormData>({
    resolver: zodResolver(reportItemSchema),
  });

  const onSubmit = async (data: ReportItemFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("dateLost", data.date);
      formData.append("description", data.description);
      
      if (data.image && data.image[0]) {
        formData.append("images", data.image[0]);
      }

      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      await axios.post("http://localhost:5000/api/lost", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true,
      });

      alert("Lost item reported successfully!");
      router.push("/dashboard/my-reports");
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Report Lost Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Item Title</label>
          <input type="text" {...register("title")} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select {...register("category")} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="">Select category</option>
            <option value="Wallet">Wallet</option>
            <option value="Phone">Phone</option>
            <option value="Keys">Keys</option>
            <option value="Bag">Bag</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Document">Document</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location Lost</label>
          <input type="text" {...register("location")} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date Lost</label>
          <input type="date" {...register("date")} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea rows={4} {...register("description")} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Photo</label>
          <input type="file" {...register("image")} className="w-full px-4 py-2 border rounded-md" accept="image/*" />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message as string}</p>}
        </div>
        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:scale-105 transition-transform font-bold text-lg disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
