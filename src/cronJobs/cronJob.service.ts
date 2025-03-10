import { Injectable } from "@nestjs/common";
import { Cronjob } from "src/schema/cronJob.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CronJob } from "cron";
import axios from "axios";




@Injectable()
export class cronJobService{

    constructor(@InjectModel(Cronjob.name) private CronjobModel: Model<Cronjob>){
        this.ScheduleJobs()
    }

    async ScheduleJobs(){
        const jobs = await this.CronjobModel.find()
        // console.log(jobs)
        jobs.forEach((job) =>{
            if(new Date(job.startDate).getTime() <= new Date().getTime()){
                
                return new CronJob(job.scheduleTime, async() => {
                    try {
                        const res = await axios.get(job.link)
                        console.log(res.data);
                        job.history.push({triggerTime: new Date().toISOString(), response:res.data})
                        await job.save()
                        
                    } catch (error) {
                        console.log(error);
                        
                    }
        
                },null,true,'Asia/Kolkata')
        
            }

        })

    }
    
}