import { FaArrowRight } from "react-icons/fa";

type twoFactorFormProps = {
    handleLoginForm: (event:React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleFormEdit: (event:React.ChangeEvent<HTMLInputElement>, name: string) => void,
}

export const TwoFactorAuthForm = ({ handleLoginForm, handleFormEdit }: twoFactorFormProps) => {
    return (
        <>
            <form className="flex flex-col" onSubmit={handleLoginForm}>
                <label htmlFor="code" className="font-semibold text-sm mb-2">Two Factor Code:</label>
                <input
                    className="mb-5"
                    onChange={(e) => handleFormEdit(e, e.target.name)}
                    name='code'
                    type="text" 
                    minLength={6} 
                    maxLength={6} 
                    placeholder="123456"
                />
                <button type="submit"> Confirm <FaArrowRight className='text-red-600'/></button>
            </form>
        </>
    )
}