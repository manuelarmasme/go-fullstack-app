import { Box, Container, Flex } from "@chakra-ui/react"
import { useColorMode } from "./color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import goLangLogo from "../../assets/golang.png"


function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <Container marginTop={"10px"}>
            <Box bg={colorMode === "light" ? "gray.900" : "gray.700"} w="100%" p={4} color="white" borderRadius="md" textAlign="center">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box fontWeight="bold">
                        My todo app con:
                        <img src="/react.svg" alt="Logo de React" style={{ display: 'inline-block', marginLeft: '10px', height: '24px', verticalAlign: 'middle' }} />
                        <img src={goLangLogo} alt="Logo de Go" style={{ display: 'inline-block', height: '48px', verticalAlign: 'middle' }} />
                    </Box>
                    <Box
                        as="button"
                        onClick={toggleColorMode}
                        bg={colorMode === "light" ? "gray.900" : "gray.700"}
                        px={3}
                        py={1}
                        borderRadius="md"
                    >
                        {colorMode === "light" ? <IoMoon/> : <LuSun/>}
                    </Box>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar