using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyAudio
{
  public class MyNoiseWaveProvider : MyWaveProvider32
  {
    private int sample = 0;
    private float rndAmplitude = 0;
    private float rndFrequency = 0;
    private Random random = new Random();

    private float calcQuaterPeriode()
    {
      return 0.25f / rndFrequency;
    }

    private float calcThreeQuaterPeriode()
    {
      return 0.75f / rndFrequency;
    }

    private float calcPeriode()
    {
      return 1.0f / rndFrequency;   
    }

    private float calcSlope()
    {
      return 4 * rndFrequency * rndAmplitude;
    }

    private void rndNoise()
    {
      rndFrequency = Math.Max((float)random.NextDouble() * Frequency, 0.01f);
      rndAmplitude = Math.Max((float)random.NextDouble() * Amplitude, 0.01f);
    }

    public override int Read(float[] buffer, int offset, int sampleCount)
    {
      float sampleRate = WaveFormat.SampleRate;
      float quaterPeriode = calcQuaterPeriode();
      float threeQuaterPeriode = calcQuaterPeriode();
      float periode = calcPeriode();
      float slope = calcSlope();


      for (int n = 0; n < sampleCount; n++)
      {
        if (sample == 0)
        {
          rndNoise();
          quaterPeriode = calcQuaterPeriode();
          threeQuaterPeriode = calcThreeQuaterPeriode();;
          periode = calcThreeQuaterPeriode();
          slope = calcSlope();
        }

        float time = sample / sampleRate;
        sample++;

        if (time <= quaterPeriode)
          buffer[n + offset] = slope * time;
        else if (time <= threeQuaterPeriode)
          buffer[n + offset] = -slope * time + 2 * Amplitude;
        else if (time <= periode)
        {
          buffer[n + offset] = slope * time - 4 * Amplitude;
        }
        else
        {
          buffer[n + offset] = 0.0f;
          sample = 0;
        }
      }

      return sampleCount;
    }
  }
}
