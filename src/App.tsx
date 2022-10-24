import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { GridItem } from "./components/GridItem";
import leftArrowImage from "./assets/leftarrow.png";

import { levels, calculateImc, Level } from "./helpers/imc";
const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if (heightField && weightField) {
            setToShow(calculateImc(heightField, weightField));
        } else {
            alert("Digite em todos os campos!");
        }
    };

    const handleBackButton = () => {
        setToShow(null); //limpa esse setToShow colocando o null
        setHeightField(0); //limpa os campos
        setWeightField(0); //limpa os campos
    };

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImage} alt="" width={150} />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC</h1>
                    <p>
                        IMC é a sigla para Índice de Massa Corpórea. Parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de
                        cada pessoa.
                    </p>

                    <input
                        type="number"
                        placeholder="Digite a sua altura. Ex 1.70 (em métros)"
                        value={heightField > 0 ? heightField : ""} //ESSA VALIDAÇÃO SIGNIFICA QUE É PARA APARECER O PLACEHOLDER AO INVÉS DO 0 DE INICIALIZAÇÃO DO useState
                        onChange={(e) => setHeightField(parseFloat(e.target.value))} //AQUI O CODIGO JÁ VEM CONVERTIDO EM NUMERO
                        disabled={toShow ? true : false} //usando o perador ternario junto com o desabled para desabilitar a opção de clicar no botao
                    />
                    <input
                        type="number"
                        placeholder="Digite o seu peso. Ex 75 (em kg)"
                        value={weightField > 0 ? weightField : ""} //ESSA VALIDAÇÃO SIGNIFICA QUE É PARA APARECER O PLACEHOLDER AO INVÉS DO 0 DE INICIALIZAÇÃO DO useState
                        onChange={(e) => setWeightField(parseFloat(e.target.value))} //AQUI O CODIGO JÁ VEM CONVERTIDO EM NUMERO
                        disabled={toShow ? true : false} //usando o perador ternario junto com o desabled para desabilitar a opção de clicar no botao
                    />

                    <button onClick={handleCalculateButton} disabled={toShow ? true : false}>
                        Calcular
                    </button>
                </div>
                <div className={styles.rightSide}>
                    {!toShow && (
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} /> //component usado aqui para melhor organizar o rightSide
                            ))}
                        </div>
                    )}
                    {toShow && (
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <img src={leftArrowImage} alt="" width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
