import { FaExclamationTriangle, FaToggleOff, FaToggleOn } from "react-icons/fa";

type formDataProps = {
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string,
    newPassword: string,
    removePlan: boolean,
    twoFactorAuth: boolean | undefined
}

type formProps = {
    saveChanges: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleFormEdit: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void,
    isPending: boolean,
    formData: formDataProps,
    requirePassword: boolean,
    setFormData: (value: formDataProps) => void
} 

const ProfileSettingsForm = ({ saveChanges, handleFormEdit, isPending, formData, requirePassword, setFormData }: formProps) => {
    return(
        <>
            <form onSubmit={saveChanges} className='flex flex-col'>
                <div className='flex gap-4'>
                    <div className='flex flex-col'>
                        <label className='font-semibold' htmlFor="firstName">First Name:</label>
                            <input
                            onChange={(e) => handleFormEdit(e, e.target.name)}
                            name='firstName'
                            id='firstName'
                            type="text"
                            value={formData.firstName}
                            placeholder='John'
                            disabled={isPending}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className='font-semibold' htmlFor="lastName">Last Name:</label>
                            <input
                            onChange={(e) => handleFormEdit(e, e.target.name)}
                            name='lastName'
                            id='lastName'
                            type="text"
                            value={formData.lastName}
                            placeholder='Doe'
                            disabled={isPending}
                        />
                    </div>
                </div>

                <label className='font-semibold' htmlFor="email">Email:</label>
                <input 
                    onChange={(e) => handleFormEdit(e, e.target.name)}
                    name='email' 
                    type="email"
                    id='email'
                    value={formData.email}
                    placeholder='johnDoe@outlook.com'
                    disabled={isPending}
                />

                <div className='flex flex-col mb-2'>
                    <label className='font-semibold' htmlFor="password">Password:</label>
                    <input
                        onChange={(e) => handleFormEdit(e, e.target.name)}
                        name='password'
                        type="password"
                        id="password"
                        min={1}
                        value={formData.password}
                        placeholder='******'
                        disabled={isPending}
                    />
                    { requirePassword && <p className='text-[12px] text-red-600'>Password is a Required Field</p> }
                </div>

                <label className='font-semibold' htmlFor="newPassword">New Password:</label>
                <input 
                    onChange={(e) => handleFormEdit(e, e.target.name)}
                    name='newPassword'
                    type="password"
                    id="newPassword"
                    minLength={6}
                    value={formData.newPassword}
                    placeholder='******'
                    disabled={isPending}
                />

                {formData.removePlan && <div className='w-full bg-orange-100 rounded p-1 pl-2 pr-2 mb-3 mt-3'>
                    <p className='flex items-center gap-2 text-[12px] text-justify text-zinc-800'><FaExclamationTriangle className='text-4xl text-yellow-300 max-[600px]:text-6xl max-[1024px]:text-5xl'/>You want to remove your plan? This action will result in the loss of your plan benefits and your subscribed classes.</p>
                </div>}

                <div className='flex flex-nowrap items-center justify-between mt-3 border border-zinc-400 p-3 rounded'>
                    <p className='text-sm font-semibold max-[1024px]:text-[14px]'>Remove my Plan</p>
                    <button 
                            type='button' 
                            onClick={() => {
                                setFormData({...formData,
                                    removePlan: !formData.removePlan,
                                })
                            }} 
                            className='cursor-pointer mr-1' 
                            name='RemovePlan'
                            disabled={isPending}
                        >
                        <span className='text-2xl'>{ formData.removePlan ? <FaToggleOn /> : <FaToggleOff /> }</span>
                    </button>
                </div>
                <div className='flex items-center justify-between mt-3 border border-zinc-400 p-3 rounded'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-semibold mb-1 max-[1024px]:text-[14px]'>Two Factor Authentication</p>
                        <p className='text-xs font-semibold text-zinc-700'>Enable Two Factor Authentication for your account</p>
                    </div>
                    <button 
                            type='button' 
                            onClick={ () => {
                                setFormData({...formData,
                                    twoFactorAuth: !formData.twoFactorAuth,
                                })
                            }} 
                            className='cursor-pointer mr-1' 
                            name='RemovePlan'
                            disabled={isPending}
                        >
                        <span className='text-2xl'>{formData.twoFactorAuth ? <FaToggleOn /> : <FaToggleOff />}</span>
                    </button>
                </div>
                <button type='submit'>Save</button>
            </form>
        </>
    )
}

export default ProfileSettingsForm;