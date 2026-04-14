import { useCallback, useState } from 'react'

const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => (b === 0 ? null : a / b),
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return '0'
  const v = Number.parseFloat(Number(n).toPrecision(12))
  return String(v)
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [memory, setMemory] = useState(null)
  const [pendingOp, setPendingOp] = useState(null)
  const [overwrite, setOverwrite] = useState(false)
  const [error, setError] = useState(false)

  const readDisplay = useCallback(() => {
    const n = parseFloat(display)
    return Number.isFinite(n) ? n : 0
  }, [display])

  const clearError = useCallback(() => {
    setError(false)
    setDisplay('0')
    setMemory(null)
    setPendingOp(null)
    setOverwrite(true)
  }, [])

  const inputDigit = useCallback(
    (digit) => {
      if (error) {
        clearError()
        setDisplay(String(digit))
        setOverwrite(false)
        return
      }
      if (overwrite) {
        setDisplay(String(digit))
        setOverwrite(false)
        return
      }
      setDisplay((prev) => {
        const d = Number(digit)
        if (prev === '0' && d !== 0) return String(digit)
        if (prev === '-0' && d !== 0) return '-' + String(digit)
        if (prev === '0' && d === 0) return '0'
        return prev + String(digit)
      })
    },
    [error, overwrite, clearError],
  )

  const inputDot = useCallback(() => {
    if (error) {
      clearError()
      setDisplay('0.')
      setOverwrite(false)
      return
    }
    if (overwrite) {
      setDisplay('0.')
      setOverwrite(false)
      return
    }
    setDisplay((prev) => (prev.includes('.') ? prev : prev + '.'))
  }, [error, overwrite, clearError])

  const applyPending = useCallback(
    (left, op, right) => {
      const fn = OPS[op]
      if (!fn) return left
      return fn(left, right)
    },
    [],
  )

  const commitOperator = useCallback(
    (nextOp) => {
      if (error) return
      const input = readDisplay()

      if (memory === null) {
        setMemory(input)
        setPendingOp(nextOp)
        setOverwrite(true)
        return
      }

      if (pendingOp === null) {
        setMemory(input)
        setPendingOp(nextOp)
        setOverwrite(true)
        return
      }

      if (overwrite) {
        setPendingOp(nextOp)
        return
      }

      const result = applyPending(memory, pendingOp, input)
      if (result === null) {
        setError(true)
        setDisplay('Cannot divide by zero')
        setMemory(null)
        setPendingOp(null)
        setOverwrite(true)
        return
      }

      const shown = formatNumber(result)
      setMemory(result)
      setDisplay(shown)
      setPendingOp(nextOp)
      setOverwrite(true)
    },
    [error, memory, pendingOp, overwrite, readDisplay, applyPending],
  )

  const equals = useCallback(() => {
    if (error) return
    if (memory === null || pendingOp === null) {
      setOverwrite(true)
      return
    }
    const input = readDisplay()
    const result = applyPending(memory, pendingOp, input)
    if (result === null) {
      setError(true)
      setDisplay('Cannot divide by zero')
      setMemory(null)
      setPendingOp(null)
      setOverwrite(true)
      return
    }
    setDisplay(formatNumber(result))
    setMemory(null)
    setPendingOp(null)
    setOverwrite(true)
  }, [error, memory, pendingOp, readDisplay, applyPending])

  const clearEntry = useCallback(() => {
    if (error) {
      clearError()
      return
    }
    setDisplay('0')
    setOverwrite(true)
  }, [error, clearError])

  return (
    <div className="page">
      <h1>Calculator</h1>
      <p className="page-lead">
        Basic operations (+ − × ÷), <strong>CE</strong> clears the current entry,{' '}
        <strong>=</strong> completes the calculation.
      </p>
      <section className="calculator" aria-label="Calculator">
        <output className="calculator-display" htmlFor="calculator-keys" aria-live="polite">
          {display}
        </output>
        <div id="calculator-keys" className="calculator-keys">
          <button type="button" className="calculator-btn" onClick={clearEntry}>
            CE
          </button>
          <span className="calculator-btn-spacer" aria-hidden="true" />
          <span className="calculator-btn-spacer" aria-hidden="true" />
          <button
            type="button"
            className="calculator-btn calculator-btn--op"
            onClick={() => commitOperator('/')}
          >
            ÷
          </button>

          <button type="button" className="calculator-btn" onClick={() => inputDigit(7)}>
            7
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(8)}>
            8
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(9)}>
            9
          </button>
          <button
            type="button"
            className="calculator-btn calculator-btn--op"
            onClick={() => commitOperator('*')}
          >
            ×
          </button>

          <button type="button" className="calculator-btn" onClick={() => inputDigit(4)}>
            4
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(5)}>
            5
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(6)}>
            6
          </button>
          <button
            type="button"
            className="calculator-btn calculator-btn--op"
            onClick={() => commitOperator('-')}
          >
            −
          </button>

          <button type="button" className="calculator-btn" onClick={() => inputDigit(1)}>
            1
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(2)}>
            2
          </button>
          <button type="button" className="calculator-btn" onClick={() => inputDigit(3)}>
            3
          </button>
          <button
            type="button"
            className="calculator-btn calculator-btn--op"
            onClick={() => commitOperator('+')}
          >
            +
          </button>

          <button
            type="button"
            className="calculator-btn calculator-btn--wide"
            onClick={() => inputDigit(0)}
          >
            0
          </button>
          <button type="button" className="calculator-btn" onClick={inputDot}>
            .
          </button>
          <button
            type="button"
            className="calculator-btn calculator-btn--equals"
            onClick={equals}
          >
            =
          </button>
        </div>
      </section>
    </div>
  )
}
