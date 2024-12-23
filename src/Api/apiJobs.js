import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
   const supabase = await supabaseClient(token);
   let query = supabase
      .from("jobs")
      .select("*, saved: save_jobs(id), company: companies(name,logo_url)");

   if (location) {
      query = query.eq("location", location);
   }

   if (company_id) {
      query = query.eq("company_id", company_id);
   }

   if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
   }

   const { data, error } = await query;

   if (error) {
      console.error("Error fetching Jobs:", error);
      return null;
   }

   return data;
}
// save job
export async function saveJob(token, { alreadySave }, saveData) {
   const supabase = await supabaseClient(token);

   if (alreadySave) {
      const { data, error: deleteError } = await supabase
      .from("save_jobs")
      .delete()
      .eq("job_id", saveData.job_id);
      if (deleteError) {
         console.error("Error deleting saved  jobs", deleteError);
         return null;
      }
      return data
   }  else{
      const { data, error:insertError } = await supabase
         .from("save_jobs")
         .insert([saveData])
         .select()
      if (insertError) {
         console.error("Error saved  jobs", insertError);
         return null;
      }
      return data
   }
   
}
//  single job
export async function getSingleJob(token,{job_id}) {
   const supabase = await supabaseClient(token);
   const { data, error } = await supabase.from("jobs")
   .select("*,  company: companies(name,logo_url),applications :applications(*)")
   .eq("id",job_id)
   .single();
   if (error) {
      console.error("Error fetching Companies:", error);
      return null;
   }

   return data;
}
// update Hiring Status 

export async function updateHiringStatus(token, { job_id },isOpen) {
   const supabase = await supabaseClient(token);
   const { data, error } = await supabase
       .from("jobs")
      .update({isOpen})
      .eq("id", job_id)
       .select()
   if (error) {
      console.error("Error updating job:", error);
      return null;
   }

   return data;
}

export async function addNewJob(token, _, jobData) {
   const supabase = await supabaseClient(token);
   const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();

   if (error) {
      console.error("Error creating job:", error);
       return null
   }

   return data;
}

export async function getSavedJobs(token) {
   const supabase = await supabaseClient(token);
   const { data, error } = await supabase
      .from("save_jobs")
      .select("* ,job:jobs(*,company:companies(name,logo_url))");

   if (error) {
      console.error(" Error Fetching save job:", error);
       return null;
   }

   return data;
}

// get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
   const supabase = await supabaseClient(token);

   const { data, error } = await supabase
      .from("jobs")
      .select("*, company: companies(name,logo_url)")
      .eq("recruiter_id", recruiter_id);

   if (error) {
      console.error("Error fetching Jobs:", error);
      return null;
   }

   return data;
}

// Delete job
export async function deleteJob(token, { job_id }) {
   const supabase = await supabaseClient(token);

   const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();

   if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
   }

   return data;
}