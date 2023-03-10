import React from 'react'

const ProductAdd = () => {
    let row: any = '5'
    let col: any = '20'
    return (
        <section className='py-[2%]'>
            <h2 className='text-[#13490A] font-bold mr-[26%]'>Add New Product</h2>
            <div className='flex justify-start'>
                <button className='bg-[#05AB2A] text-[#F3FFF1] font-light h-[5vh] w-[8%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md'>Back</button>
            </div>
            <div className='grid grid-cols-[50%_50%] h-full mt-[2%]'>
                <div className=' grid gap-y-[5%]'>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Name</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Category</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Measurement Unit</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Brand</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Description</label>
                        <textarea rows={row} cols={col} className='bg-[#F3FFF1] text-[#13490A] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center'></textarea>
                    </div>
                    <div className='grid grid-cols-[40%_60%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Distributor</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[40%_60%] mt-1'>
                        <div></div>
                        <div className='flex justify-center'>
                            <button className='bg-[#05AB2A] text-[#F3FFF1] mx-auto font-light h-[5vh] px-[3%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md'>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='grid grid-rows-[10%_10%_10%] gap-y-[5%]'>
                    <div className='grid grid-cols-[38%_50%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>HSN</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[38%_50%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Tax %</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                    <div className='grid grid-cols-[38%_50%]'>
                        <label className='text-center text-[#13490A] font-bold text-base'>Id</label>
                        <input type='text' className='bg-[#F3FFF1] text-[#13490A] h-[5vh] font-bold shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md py-[0.5%] text-center' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductAdd