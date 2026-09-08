import "./App.css";

export default function AboutMe() {


    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Tailwind CSS",
        "Formik",
        "Yup",
        "Git",
        "GitHub"
    ];


    return (

        <div className="min-h-screen  from-slate-900 via-blue-900 to-indigo-900 py-10 px-5">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Hero Section */}
                <div className="md:flex">
                    <div className="md:w-1/3 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
                        <div className="w-36 h-36 rounded-full bg-white text-blue-600 flex items-center justify-center text-5xl font-bold shadow-lg">
                            RK
                        </div>

                        <h1 className="text-4xl font-bold mt-6">
                            Raj Kasumriya
                        </h1>

                        <p className="text-blue-100 mt-2 text-lg">
                            Frontend Web Developer
                        </p>

                        <p className="mt-4 text-center">
                            📍 Singawada, Dewas,
                            <br />
                            Madhya Pradesh
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="md:w-2/3 p-8">

                        {/* About */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                About Me 
                            </h2>

                            <p className="text-gray-700 leading-8">
                                Hello! My name is <strong>Raj Kasumriya</strong>. I am
                                currently pursuing a Bachelor of Technology (B.Tech) in
                                Computer Science and Engineering from Mahakal Institute of
                                Technology, Ujjain. I am passionate about Frontend Web
                                Development and enjoy building responsive, modern, and
                                user-friendly web applications.
                            </p>
                        </section>

                        {/* Family */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                Family Background
                            </h2>

                            <div className="bg-gray-100 rounded-xl p-5 shadow">
                                <p className="text-gray-700 leading-8">
                                    I belong to a supportive family. My father's name is
                                    <strong> Dinesh Kasumriya</strong>, and he works in the
                                    civil construction field. My mother's name is
                                    <strong> Yashoda Kasumriya</strong>, and she is a
                                    homemaker. I also have a younger brother,
                                    <strong> Manish Kasumriya</strong>.
                                </p>
                            </div>
                        </section>

                        {/* Coding Journey */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                Coding Journey
                            </h2>

                            <div className="bg-gray-100 rounded-xl p-5 shadow">
                                <p className="text-gray-700 leading-8">
                                    My coding journey started in Class 12 through the
                                    CodeYogi Foundation. With the guidance of my teachers,
                                    I discovered my passion for programming and software
                                    development. I began learning coding from the basics and
                                    practiced consistently using both my mobile phone and
                                    laptop. This journey improved my problem-solving skills
                                    and strengthened my interest in frontend development.
                                </p>
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                Technical Skills
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Project */}
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                Featured Project
                            </h2>

                            <div className="bg-gray-100 rounded-xl p-5 shadow">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Blood Donors Web Application
                                </h3>

                                <p className="text-gray-700 mt-3 leading-8">
                                    Developed a responsive Blood Donors Web Application
                                    using React.js and Tailwind CSS. Implemented Formik for
                                    form management and Yup for validation to create a
                                    smooth, secure, and user-friendly registration
                                    experience.
                                </p>
                            </div>
                        </section>

                        {/* Career Goal */}
                        <section>
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">
                                Career Goal
                            </h2>

                            <div className="bg-gray-100 rounded-xl p-5 shadow">
                                <p className="text-gray-700 leading-8">
                                    My goal is to become a Software Engineer and build
                                    innovative software that solves real-world problems. I
                                    believe that continuous learning, dedication, and the
                                    guidance of the CodeYogi Foundation will help me achieve
                                    my dream. I am committed to improving my skills every
                                    day and contributing to the success of the organization.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>










    );
}

