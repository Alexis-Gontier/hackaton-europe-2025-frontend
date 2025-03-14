import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function useAuth() {

    async function register() {
        // register logic
    }

    async function login() {
        // login logic
    }

    async function logout() {
        // logout logic
    }

    async function fetchUser() {
        // fetch user logic
    }

    return {
        register,
        login,
        logout,
        fetchUser
    }
}
