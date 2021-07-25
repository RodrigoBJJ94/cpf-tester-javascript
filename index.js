function ValidateCpf(sentCpf) {
    Object.defineProperty(this, 'cleanCpf', {
        enumerable : true,
        get: function () {
            return sentCpf.replace(/\D+/g, '');
        }
    });
}

ValidateCpf.prototype.validate = function () {
    if (typeof this.cleanCpf === 'undefined') return false;
    if (this.cleanCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    const partialCpf = this.cleanCpf.slice(0, -2);
    const digit1 = this.createDigit(partialCpf);
    const digit2 = this.createDigit(partialCpf + digit1);
    const newCpf = partialCpf + digit1 + digit2;
    return newCpf === this.cleanCpf;
};

ValidateCpf.prototype.createDigit = function (partialCpf) {
    const cpfArray = Array.from(partialCpf);
    let regressive = cpfArray.length + 1;
    const total = cpfArray.reduce((accumulator, value) => {
        accumulator += (regressive * Number(value));
        regressive--;
        return accumulator;
    }, 0);
    const digit = 11 - (total % 11);
    return digit > 9 ? '0' : String(digit);
};

ValidateCpf.prototype.isSequence = function() {
    const sequence = this.cleanCpf[0].repeat(this.cleanCpf.length);
    return sequence === this.cleanCpf;
};

const cpf = new ValidateCpf('070.987.720-03');

if(cpf.validate()) {
    console.log('CPF is valid!');
} else {
    console.log('CPF is not valid!');
}
